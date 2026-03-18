import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="px-4 py-2 border-t shadow-inner bg-accent flex justify-between items-baseline-last">
        <div className="flex flex-col justify-between items-center">
          <Logo type="footer" />
          <p className="font-semibold text-lg uppercase">
            Nền tảng tự học và thi thử ielts
          </p>
        </div>
        <p className="text-accent-foreground tracking-wider">
          © {year} LearnTestUse. All rights reserved.
        </p>
      </footer>
    </>
  );
}
