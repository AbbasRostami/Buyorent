import Image from "next/image";
import { CiMedal } from "react-icons/ci";
import logo from "./../../../assets/Landing/image 5.png";
import { MotionDiv, MotionP, MotionSpan } from "../../providers/MotionWrapper";

const text = `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
صورت می توان امید داشت.`;

export default function Rating() {
  return (
    <div className="flex flex-col min-[1009px]:flex-row items-center justify-center gap-8 px-4 py-12 max-w-7xl mt-8 mx-auto">
      <MotionDiv
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full min-[1009px]:w-1/2 space-y-4 text-right"
      >
        <MotionDiv className="inline-flex items-center justify-center w-10 h-10 rounded-full text-xl border-2 border-yellow-600">
          <CiMedal size={30} />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold leading-tight overflow-hidden"
        >
          <MotionDiv
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            viewport={{ once: true }}
            className="whitespace-nowrap"
          >
            رتبه برتر در بین وبسایت‌های رزرو و اجاره ایران
          </MotionDiv>
        </MotionDiv>

        <MotionP
          dir="rtl"
          className="text-sm md:text-base text-justify mt-7 font-normal leading-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 3,
            ease: "easeIn",
            delay: 1,
            when: "beforeChildren",
          }}
          viewport={{ once: true }}
        >
          {text.split(" ").map((word, i) => (
            <MotionSpan
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {word + " "}
            </MotionSpan>
          ))}
        </MotionP>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex-shrink-0 w-full min-[1009px]:w-1/2 shadow-2xl rounded-xl"
      >
        <Image
          src={logo}
          alt=""
          width={800}
          height={500}
          className="object-cover w-full h-auto"
          priority
        />
      </MotionDiv>
    </div>
  );
}
