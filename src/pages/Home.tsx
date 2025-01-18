import React from 'react';
import Layout from '../components/Layout';
import HeroSlider from '../components/home/HeroSlider';
import SearchBar from '../components/home/SearchBar';
import FeaturedProperties from '../components/home/FeaturedProperties';
import SiteFeatures from '../components/home/SiteFeatures';
import TopBuilders from '../components/home/TopBuilders';
import CustomerReviews from '../components/home/CustomerReviews';

export default function Home() {
  return (
    <Layout>
      <HeroSlider />
      <SearchBar />
      <FeaturedProperties />
      <SiteFeatures />
      <TopBuilders />
      <CustomerReviews />
    </Layout>
  );
}