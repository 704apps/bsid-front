"use client";

import ProtectedRoute from "@/app/hoc/protectedroute";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaDownload } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Footer from "@/app/components/common/footer";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Navigation } from "@/app/components/common/navigation";
import PreviewCard from "@/app/components/dashboard/createAudioSignature/previewCard";
import { DataTableDemo } from "@/app/components/dashboard/viewAudioSignatures/datatable";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

Chart.register(CategoryScale);

mapboxgl.accessToken =
  "pk.eyJ1IjoidGVzdGViYXlhbm1lZCIsImEiOiJjazd1d2U4OTMxNW9hM2lvNGI3cGFyaGVnIn0.Q4bC04l_8IU6HqONKXbcDA";

interface Signature {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  linkRedirect: string;
  logo: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Engagement {
  code: string;
  latitude: string;
  longitude: string;
  city: string | null;
  country: string | null;
  modelDevice: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
}

const ViewAudioSignatures = () => {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [loadingSignatures, setLoadingSignatures] = useState(true);
  const [selectedSignature, setSelectedSignature] = useState<string>("");
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [loadingEngagements, setLoadingEngagements] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [audioFile, setAudioFile] = useState<string>("");
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const chartRefs = useRef(new Map<string, Chart>());

  const handleResize = useCallback(() => {
    chartRefs.current.forEach((chart) => {
      if (chart) {
        chart.resize();
      }
    });
  }, []);

  const fetchSignatures = async () => {
    setLoadingSignatures(true);
    try {
      const response = await axios.get(`/api/listSignatures`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });

      const sortedData = response.data.sort(
        (a: Signature, b: Signature) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setSignatures(sortedData);
      if (sortedData.length > 0) {
        setSelectedSignature(sortedData[0].id.toString());
      }
    } catch (error) {
      console.error("Error fetching signatures:", error);
    } finally {
      setLoadingSignatures(false);
    }
  };

  const fetchEngagements = async (signatureId: string) => {
    setLoadingEngagements(true);
    try {
      const response = await axios.get(`/api/engagement/notification/${signatureId}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });

      const data = response.data;
      setEngagements(Array.isArray(data.engagement) ? data.engagement : []);
      setSelectedNotification(data.notification);
      setAudioFile(data.dtmf?.audioFile || "");
    } catch (error: unknown) {
      console.error("Error fetching engagements:", error);
      setEngagements([]);
    } finally {
      setLoadingEngagements(false);
    }
  };

  useEffect(() => {
    fetchSignatures();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapContainerRef.current) {
        console.error("Map container ref is null, retrying...");
        return;
      }

      if (map.current) {
        console.log("Map already initialized.");
        return;
      }

      console.log("Initializing map...");

      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-38.5267, -3.7319],
        zoom: 10,
      });

      map.current.on("load", () => {
        console.log("Map loaded.");

        const geojson = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [-38.5267, -3.7319] },
              properties: { mag: 1 },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [-38.5267, -3.7329] },
              properties: { mag: 2 },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [-38.5267, -3.7339] },
              properties: { mag: 3 },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [-38.5167, -3.7319] },
              properties: { mag: 4 },
            },
          ],
        };

        map.current?.addSource("heatmap", {
          type: "geojson",
          data: geojson,
        });

        map.current?.addLayer({
          id: "heatmap",
          type: "heatmap",
          source: "heatmap",
          paint: {
            "heatmap-weight": {
              property: "mag",
              type: "exponential",
              stops: [
                [0, 0],
                [6, 1],
              ],
            } as mapboxgl.PropertyValueSpecification<number>,
            "heatmap-intensity": {
              stops: [
                [0, 1],
                [15, 3],
              ],
            } as mapboxgl.PropertyValueSpecification<number>,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(33,102,172,0)",
              0.2,
              "rgb(103,169,207)",
              0.4,
              "rgb(209,229,240)",
              0.6,
              "rgb(136, 241, 157)",
              0.8,
              "rgb(60, 225, 93)",
              1,
              "rgb(14, 203, 52)",
            ],
            "heatmap-radius": {
              stops: [
                [0, 10],
                [15, 20],
              ],
            } as mapboxgl.PropertyValueSpecification<number>,
          },
        });

        map.current?.resize();
      });

      map.current.on("error", (e) => {
        console.error("Mapbox error:", e);
      });
    };

    setTimeout(() => {
      if (
        mapContainerRef.current &&
        mapContainerRef.current.offsetWidth > 0 &&
        mapContainerRef.current.offsetHeight > 0
      ) {
        console.log("Map container is ready.");
        initializeMap();
      } else {
        console.error(
          "Map container ref is still null or has no dimensions, retrying..."
        );
      }
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // gambiarra, apagar depois
  useEffect(() => {
    const isReloaded = sessionStorage.getItem('reloaded');
    if (!isReloaded) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (selectedSignature) {
      fetchEngagements(selectedSignature);
      window.scrollTo(0, 0);
    }
  }, [selectedSignature]);

  const getEngagementData = () => {
    const dates = engagements.map((e) =>
      new Date(e.createdAt).toLocaleDateString()
    );
    const uniqueDates = Array.from(new Set(dates));
    const counts = uniqueDates.map(
      (date) => dates.filter((d) => d === date).length
    );

    return {
      labels: uniqueDates,
      datasets: [
        {
          label: "Leituras",
          data: counts,
          backgroundColor: "#66BB6A",
        },
      ],
    };
  };

  const engagementChartData = {
    datasets: [
      {
        data: [90, 10],
        backgroundColor: ["#66BB6A", "#388E3C"],
      },
    ],
  };

  const engagementChartData2 = {
    datasets: [
      {
        data: [40, 60],
        backgroundColor: ["#66BB6A", "#388E3C"],
      },
    ],
  };

  const EngagementSection = ({ notification }: { notification: any }) => {
    const totalEngagements = engagements.length;

    const sortedEngagements =
      Array.isArray(engagements) && engagements.length > 0
        ? engagements
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() -
              new Date(b.createdAt).getTime()
          )
        : [];

    const firstEngagement =
      sortedEngagements.length > 0
        ? new Date(sortedEngagements[0].createdAt).toLocaleDateString()
        : "";
    const lastEngagement =
      sortedEngagements.length > 0
        ? new Date(
          sortedEngagements[sortedEngagements.length - 1].createdAt
        ).toLocaleDateString()
        : "";

    return (
      <div className="w-full lg:w-1/2 p-4 border rounded-lg mb-4 lg:mb-0">
        <div className="text-md font-bold mt-2 mb-2">Engajamento:</div>
        {loadingEngagements ? (
          <>
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-20 w-full mb-2" />
            <Skeleton className="h-40 w-full mb-2" />
          </>
        ) : (
          <>
            <div className="font-bold text-4xl mb-2">
              {totalEngagements} leituras
            </div>
            <div>
              Primeira leitura em: {firstEngagement} - Última leitura em:{" "}
              {lastEngagement}
            </div>
            <div className="mt-4">
              <Bar
                data={getEngagementData()}
                ref={(el) => {
                  if (el) {
                    chartRefs.current.set(
                      "engagementChart",
                      el as unknown as Chart
                    );
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  const SignatureInfo = ({
    notification,
    audioFile,
  }: {
    notification: any;
    audioFile: string;
  }) => (
    <div className="mb-4 p-4 border rounded-lg">
      {loadingEngagements ? (
        <>
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-1/4 mb-2" />
          <Skeleton className="h-10 w-full mb-2" />
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4">{notification.title}</h2>
          <div className="mb-2">
            <span className="font-bold">Criação em:</span> {new Date(notification.createdAt).toLocaleDateString()} | <span className="font-bold">Atualizado em:</span> {new Date(notification.updatedAt).toLocaleDateString()}
          </div>
          <div className="mb-2">
            <span className="font-bold">Link de direcionamento:</span>{" "}
            <a href={notification.linkRedirect} className="text-blue-500">
              {notification.linkRedirect}
            </a>
          </div>
          {audioFile && (
            <div className="flex items-center mt-2">
              <a
                href={audioFile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gray-500 text-white py-2 px-4 rounded"
              >
                <FaDownload className="text-lg mr-2" />
                Salvar áudio
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );

  const PreviewCardSection = ({ notification }: { notification: any }) => (
    <div className="w-full lg:w-1/2 p-4 border rounded-lg">
      {loadingEngagements ? (
        <>
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-40 w-full mb-2" />
        </>
      ) : (
        <PreviewCard
          formData={{
            title: notification.title,
            shortDescription: notification.shortDescription,
            link: notification.linkRedirect,
            logoPreview: notification.logo,
            bannerPreview: notification.banner,
          }}
        />
      )}
    </div>
  );

  const MapSection = () => (
    <div
      ref={mapContainerRef}
      className="w-full h-96 mt-4 bg-gray-200 rounded-lg"
    />
  );

  const ReadingLocations = () => {
    const locationData = {
      labels: [
        "Fortaleza - CE",
        "Juazeiro do Norte - CE",
        "Crato - CE",
        "Brejo Santo",
      ],
      datasets: [
        {
          label: "Leituras",
          data: [43, 12, 3, 10],
          backgroundColor: "#0000FF",
          barThickness: 15,
        },
      ],
    };

    const countryData = {
      labels: ["Brasil", "Portugal", "EUA", "Paraguai"],
      datasets: [
        {
          label: "Leituras",
          data: [50, 2, 3, 1],
          backgroundColor: "#008080",
          barThickness: 15,
        },
      ],
    };

    return (
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="w-full lg:w-1/2 p-4 border rounded-lg">
          <h3 className="text-lg font-bold mb-2">Locais de leitura temperatura:</h3>
          {loadingEngagements ? (
            <Skeleton className="h-96 w-full mb-2" />
          ) : (
            <MapSection />
          )}
        </div>
        <div className="w-full lg:w-1/2 p-4 border rounded-lg mt-4 lg:mt-0 flex flex-col justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Locais de Leitura:</h3>
            {loadingEngagements ? (
              <Skeleton className="h-40 w-full mb-2" />
            ) : (
              <div className="h-40 w-full">
                <Bar
                  data={locationData}
                  options={{
                    indexAxis: "y",
                    plugins: { legend: { display: false } },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            )}
          </div>
          <hr className="my-4" />
          <div className="flex-1">
            <h3 className="text-lg font-bold mt-4">País:</h3>
            {loadingEngagements ? (
              <Skeleton className="h-40 w-full mb-2" />
            ) : (
              <div className="h-40 w-full">
                <Bar
                  data={countryData}
                  options={{
                    indexAxis: "y",
                    plugins: { legend: { display: false } },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const DataTableSection = ({ engagements }: { engagements: Engagement[] }) => (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Quem leu sua assinatura:</h3>
      {loadingEngagements ? (
        <>
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-40 w-full mb-2" />
        </>
      ) : (
        <DataTableDemo engagements={engagements} />
      )}
    </div>
  );

  const EngagementChart = () => (
    <div className="mt-2">
      <h3 className="text-lg font-bold mb-2">Visualizações X Cliques</h3>
      <div className="flex flex-wrap justify-around items-start">
        <div className="flex flex-col lg:flex-row items-center mb-4 lg:mb-0 min-w-[200px]">
          <div className="flex flex-col items-start mr-4">
            {loadingEngagements ? (
              <>
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-40 w-full mb-2" />
              </>
            ) : (
              <>
                <div className="flex items-center mb-2">
                  <div className="bg-green-200 w-2 h-2 mr-1" />
                  <div className="text-sm">Visualizações</div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="bg-green-600 w-2 h-2 mr-1" />
                  <div className="text-sm">Cliques</div>
                </div>
                <div className="w-40 h-40 lg:w-40 lg:h-40">
                  <Pie
                    data={engagementChartData}
                    ref={(el) => {
                      if (el) {
                        chartRefs.current.set("pieChart1", el as unknown as Chart);
                      }
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center mb-4 lg:mb-0 min-w-[200px]">
          <div className="flex flex-col items-start mr-4">
            {loadingEngagements ? (
              <>
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-40 w-full mb-2" />
              </>
            ) : (
              <>
                <div className="flex items-center mb-2">
                  <div className="bg-green-200 w-2 h-2 mr-1" />
                  <div className="text-sm">Visualizações</div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="bg-green-600 w-2 h-2 mr-1" />
                  <div className="text-sm">Cliques</div>
                </div>
                <div className="w-40 h-40 lg:w-40 lg:h-40">
                  <Pie
                    data={engagementChartData2}
                    ref={(el) => {
                      if (el) {
                        chartRefs.current.set("pieChart2", el as unknown as Chart);
                      }
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ProtectedRoute>
      <Navigation />
      <div className="min-h-screen flex flex-col bg-white p-4">
        <h1
          className="text-4xl font-bold mb-8 mt-8 w-full text-left sm:text-center md:text-left"
          style={{
            fontSize: "calc(1rem + 1vw)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Suas assinaturas de áudio
        </h1>
        <div className="flex flex-col md:flex-row ">
          <div className="w-full md:w-1/4 bg-gray-100 p-4 mt-6 border rounded-lg max-h-full overflow-y-auto custom-scrollbar relative" style={{ maxHeight: "calc(100vh - 8rem)" }}>
            <h2 className="text-2xl font-bold mb-4">Assinaturas</h2>
            <ul>
              {loadingSignatures ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-12 w-full mb-2" />
                ))
              ) : (
                signatures.map((signature, index) => (
                  <li key={signature.id} className={`mb-2 ${index >= 3 ? 'hidden md:block' : ''}`}>
                    <button
                      onClick={() =>
                        setSelectedSignature(signature.id.toString())
                      }
                      className={`block w-full text-left p-2 ${selectedSignature === signature.id.toString()
                        ? "bg-gray-300 text-black"
                        : "bg-white text-black"
                        } rounded-md`}
                    >
                      <div>{signature.title}</div>
                      <div className="text-sm">
                        Criação:{" "}
                        {new Date(signature.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm">
                        Atualizado em:{" "}
                        {new Date(signature.updatedAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-blue-500">
                        {signature.linkRedirect}
                      </div>
                    </button>
                  </li>
                ))
              )}
              {signatures.length > 3 && (
                <div className="h-48 overflow-y-auto custom-scrollbar md:hidden">
                  {signatures.slice(3).map((signature) => (
                    <li key={signature.id} className="mb-2">
                      <button
                        onClick={() =>
                          setSelectedSignature(signature.id.toString())
                        }
                        className={`block w-full text-left p-2 ${selectedSignature === signature.id.toString()
                          ? "bg-gray-300 text-black"
                          : "bg-white text-black"
                          } rounded-md`}
                      >
                        <div>{signature.title}</div>
                        <div className="text-sm">
                          Criação:{" "}
                          {new Date(signature.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm">
                          Atualizado em:{" "}
                          {new Date(signature.updatedAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-blue-500">
                          {signature.linkRedirect}
                        </div>
                      </button>
                    </li>
                  ))}
                </div>
              )}
            </ul>
          </div>
          <div className="w-full md:w-3/4 bg-white p-4 overflow-y-auto custom-scrollbar" style={{ maxHeight: "calc(100vh - 8rem)" }}>
            <Tabs value={selectedSignature}>
              {selectedNotification ? (
                <TabsContent
                  key={selectedNotification.id}
                  value={selectedNotification.id.toString()}
                >
                  <SignatureInfo
                    notification={selectedNotification}
                    audioFile={audioFile}
                  />
                  <div className="flex flex-col lg:flex-row lg:space-x-4">
                    <EngagementSection notification={selectedNotification} />
                    <PreviewCardSection notification={selectedNotification} />
                  </div>
                  <hr className="my-4" />
                  <ReadingLocations />
                  <hr className="my-4" />
                  <DataTableSection engagements={engagements} />
                  <hr className="my-4" />
                  <EngagementChart />
                </TabsContent>
              ) : (
                <div>
                  <Skeleton className="h-10 w-3/4 mb-4" />
                  <div className="flex flex-col lg:flex-row lg:space-x-4">
                    <div className="w-full lg:w-1/2 p-4 border rounded-lg mb-4 lg:mb-0">
                      <Skeleton className="h-6 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-1/3 mb-2" />
                      <Skeleton className="h-20 w-full mb-2" />
                      <Skeleton className="h-40 w-full mb-2" />
                    </div>
                    <div className="w-full lg:w-1/2 p-4 border rounded-lg">
                      <Skeleton className="h-6 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-1/3 mb-2" />
                      <Skeleton className="h-40 w-full mb-2" />
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="w-full lg:w-1/2 p-4 border rounded-lg">
                    <Skeleton className="h-6 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-96 w-full mb-2" />
                  </div>
                  <hr className="my-4" />
                  <div className="w-full lg:w-1/2 p-4 border rounded-lg">
                    <Skeleton className="h-6 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-40 w-full mb-2" />
                  </div>
                  <hr className="my-4" />
                  <div className="w-full lg:w-1/2 p-4 border rounded-lg">
                    <Skeleton className="h-6 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-96 w-full mb-2" />
                  </div>
                </div>
              )}
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </ProtectedRoute>
  );
};

export default ViewAudioSignatures;
