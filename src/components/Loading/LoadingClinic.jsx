import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { motion } from "framer-motion";

const LoadingClinic = () => {
  const spinIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="py-8 px-12 bg-white rounded-xl shadow-lg border border-gray-100"
      >
        <div className="flex flex-col items-center gap-6">
          <Spin indicator={spinIcon} />
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 font-medium"
          >
            Đang tải...
          </motion.div>
          <motion.div className="w-32 h-1 bg-gray-100 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-blue-500/30"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingClinic;
