import Banner from "@/components/Home/Banner";
import PopularTours from "@/components/Home/PopularTours";
import Testimony from "@/components/Home/Testimony";
import TourTypeSelection from "@/components/Home/TourTypeSelection";
import WhyLocalExpert from "@/components/WhyLocalExpert";
import Image from "next/image";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";

type props = { params: { locale: "en" | "fa" } };
export default function Home({ params }: props) {
  return (
    <>
      <Banner />
      <PopularTours />
      <TourTypeSelection />
      <WhyLocalExpert
        media={<Image loading="lazy" src="/assets/images/home/5.webp" alt="locale expert" width={640} height={537}/>}
      />
      <Testimony />
      <section className="container mx-auto flex flex-col gap-y-4 lg:flexBetween pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-8">
        <div>
          <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1">
            Not a Member Yet?
          </h4>
          <p className="text-light dark:text-lighter mb-8">
            Join us! Our members can access savings of up to 50% and earn Trip
            Coins while booking.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={""}
            className="flexCenter gap-1 duration-300 rounded bg-darkblue hover:bg-hoverlight text-white hover:text-dark h-14 px-9 text-md font-medium"
          >
            Sign In
            <HiArrowUpRight size={18}/>
          </Link>
          <Link
            href={""}
            className="flexCenter gap-1 duration-300 rounded border border-darkblue bg-transparent hover:bg-darkblue text-darkblue hover:text-white h-14 px-9 text-md font-medium"
          >
            Register
            <HiArrowUpRight size={18}/>
          </Link>
        </div>
      </section>
    </>
  );
}
