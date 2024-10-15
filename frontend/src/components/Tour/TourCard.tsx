import React from 'react'

type props = {
  id: number;
  duration: number;
  image: string;
  title: string;
};
export default function TourCard({id,duration,image,title}:props) {
  return (
    <div>{duration}</div>
  )
}
