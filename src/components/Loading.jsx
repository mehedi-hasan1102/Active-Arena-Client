import { Commet } from "react-loading-indicators";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background blur layer */}
      <div className="absolute inset-0 backdrop-blur-sm bg-blue-100/40 dark:bg-zinc-900/60"></div>

      {/* Loader container */}
      <div className="relative z-10 p-6 rounded-md bg-white/90 dark:bg-zinc-800/90 shadow-lg border border-blue-200 dark:border-blue-700 flex items-center gap-4">
        <Commet color="#2563eb" size="medium" />
        <span className="text-blue-700 dark:text-blue-300 font-semibold text-lg">
          Please Wait . . .
        </span>
      </div>
    </div>
  );
};

export default Loading;
