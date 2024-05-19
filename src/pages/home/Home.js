import { useEffect } from "react";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import PropertyList from "../../components/propertyList/PropertyList";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <Header/>
      <div className={classes.homeContainer}>
        <Featured/>
        <h1 className={classes.homeTitle}>Browse by property type</h1>
        <PropertyList/>
        <h1 className={classes.homeTitle}>Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
