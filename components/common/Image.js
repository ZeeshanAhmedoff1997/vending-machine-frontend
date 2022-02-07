import Image from "next/image";

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const CustomImage = (props) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image {...props} />
  );
};

export default CustomImage;
