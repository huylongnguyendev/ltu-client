import { Link } from "@tanstack/react-router";

const typeLogo = {
  header: "max-lg:w-30 w-32",
  footer: "w-40",
  menu: "w-20"
};

interface LogoProps {
  type: keyof typeof typeLogo;
}

function Logo({ type }: LogoProps) {
  return (
    <>
      <Link to="/">
        <img
          src="https://learntestuse.vn/wp-content/uploads/2025/10/logo_LTC-01-1-scaled.webp"
          alt="LTU-logo-image"
          className={typeLogo[type]}
        />
      </Link>
    </>
  );
}

export default Logo;
