import { useEffect } from "react";
import { fetchApi, baseUrl } from "../api/fetchApi";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";

const DynamicMain = dynamic(() => import('../components'))
const DynamicConnect = dynamic(() => import('../components'))
const DynamicDiscover = dynamic(() => import('../components'))
const DynamicFeaturedProperties = dynamic(() => import('../components'))
const DynamicOurServices = dynamic(() => import('../components'))
const DynamicPeopleSection = dynamic(() => import('../components'))

export default function Home({ propertiesForRent }) {
  useEffect(() => {
    toast.info(
      <a
        href="https://www.figma.com/file/hw31QbF5nkROsEBiq3ng34/RealEstate-HomePage?node-id=0%3A1"
        target={"_blank"}
        rel="noreferrer"
      >
        check out figma design <span className="text-red-400">here</span>
      </a>,
      { autoClose: 15000 }
    );
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <DynamicMain />
      <DynamicDiscover />
      <DynamicOurServices />
      <DynamicFeaturedProperties propertiesForRent={propertiesForRent} />
      <DynamicPeopleSection />
      <DynamicConnect />
    </>
  );
}

export async function getStaticProps() {
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
