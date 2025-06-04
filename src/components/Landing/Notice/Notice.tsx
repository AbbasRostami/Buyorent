import {
  MotionButton,
  MotionDiv,
} from "../../../utils/providers/MotionWrapper";

export default function Notice() {
  return (
    <div className="flex justify-center items-center px-4 my-20">
      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-3 md:gap-10">
          <MotionButton
            initial={{ opacity: 0, scale: 1.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 cursor-pointer rounded-2xl text-lg lg:text-xl px-4 lg:px-6 py-5 text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md transform-glow"
          >
            🏡 میخوام آگهی بذارم!
          </MotionButton>

          <MotionDiv
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-right text-medium md:text-lg lg:text-xl xl:text-2xl dark:bg-gray-800 bg-[#FFEFD9] translate-x-7 drop-shadow-2xl rounded-r-[10px] rounded-l-[110px] w-fit z-10 px-8 xl:px-18 py-12 font-medium leading-relaxed backdrop-blur-sm relative overflow-hidden"
          >
            <MotionDiv
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 w-full h-full pointer-events-none"
            />
            <span className="relative z-10">
              اگه تو هم خونه یا ملکی داری که میخوای بفروشی یا اجاره بدی
              <span className="text-orange-600 whitespace-nowrap">
                {" "}
                الان وقتشه ! ✨
              </span>
            </span>
          </MotionDiv>
        </div>

        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute border-4 border-amber-700/80 rounded-l-xl rounded-r-full w-10/12 lg:w-4/5 left-1/2 top-1/2 -translate-x-[40%] -translate-y-1/2 pointer-events-none shadow-xl"
          style={{ height: "calc(100% + 3rem)" }}
        />
      </div>
    </div>
  );
}
