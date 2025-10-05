import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: false,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 5,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: true,
  cssEase: "ease",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: false,
      },
    },

    {
      breakpoint: 940,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
      },
    },

    {
      breakpoint: 680,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false,
      },
    },

    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

const CustomSlider = (props: any) => {
  return (
    <div className="relative px-4 lg:px-16 xl:px-20">
      <Slider {...settings}>{props.children}</Slider>
    </div>
  );
};

export default CustomSlider;
