import Banner from "@/Components/Banner";
import PopularTours from "@/Components/PopularTours";
import Testimony from "@/Components/Testimony";
import TourTypeSelection from "@/Components/TourTypeSelection";
import { upRightSVG } from "@/Utils/svg";
import Link from "next/link";

export default function Home() {

  return (
    <>
      <Banner />
      <PopularTours/>
      <TourTypeSelection/>
      <section className="bg-border grid grid-cols-1 md:grid-cols-5 w-full">
        <div className="md:col-span-2 order-1 md:order-2">
          <img
            loading="lazy"
            src="/assets/images/home/5.webp"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-3 flex flex-col justify-center py-10 order-2 md:order-1">
          <div className="mx-auto px-2">
            <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1">
              Why be a Local Expert
            </h4>
            <p className="text-light mb-8">
              These popular destinations have a lot to offer
            </p>
            <div className="mb-5 flexCenter gap-4">
              <img
                src="/assets/images/home/1.svg"
                alt=""
                className="w-12 sm:w-14"
              />
              <div className="flex flex-col items-start justify-between max-w-72">
                <h5 className="md:text-lg font-medium">Best Price Guarantee</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="mb-5 flexCenter gap-4">
              <img
                src="/assets/images/home/2.svg"
                alt=""
                className="w-12 sm:w-14"
              />
              <div className="flex flex-col items-start justify-between max-w-72">
                <h5 className="md:text-lg font-medium">Easy & Quick Booking</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="mb-5 flexCenter gap-4">
              <img
                src="/assets/images/home/3.svg"
                alt=""
                className="w-12 sm:w-14"
              />
              <div className="flex flex-col items-start justify-between max-w-72">
                <h5 className="md:text-lg font-medium">Customer Care 24/7</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimony />
      <section className="container mx-auto flex flex-col gap-y-4 lg:flexBetween pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-8">
        <div>
          <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1">
            Not a Member Yet?
          </h4>
          <p className="text-light mb-8">
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
            {upRightSVG("w-5 h-5")}
          </Link>
          <Link
            href={""}
            className="flexCenter gap-1 duration-300 rounded border border-darkblue bg-transparent hover:bg-darkblue text-darkblue hover:text-white h-14 px-9 text-md font-medium"
          >
            Register
            {upRightSVG("w-5 h-5")}
          </Link>
        </div>
      </section>
    </>
  );
}
