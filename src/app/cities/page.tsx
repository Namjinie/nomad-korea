import CityGrid from "@/components/cities/CityGrid";

export default function CitiesPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">도시 탐색</h1>
          <p className="mt-2 text-gray-500">
            한국 전역의 워케이션 도시를 비교하고 나에게 맞는 곳을 찾아보세요
          </p>
        </div>
        <CityGrid />
      </div>
    </div>
  );
}
