import React from "react";

const Footer = () => {
  return (
    <footer className="pb-8 text-sm sm:text-base">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img src="/img/footer.svg" className="mx-auto md:ml-10" alt="Kanakam Home Foods" />
        </div>
        <div className="text-black">
            <div className="mb-5">
          <div className="flex gap-3">
            <img src="/img/time.svg" alt="" />
            Opening Hours
          </div>
          <div className="pl-8">
            Sunday, Tuesday, Wednesday & Friday : Open All Day Other Days :
            Orders on Request Only
          </div>
            </div>
          <div className="flex gap-4.25">
            <img src="/img/Shape.svg" alt="" />
            Location
          </div>
          <div className="pl-8 mb-5">
            45 Faulconer Drive, Suite 4, London, SW1A 1A
          </div>
          <div className="flex gap-3">
            <img src="/img/path.svg" alt="" />
            Contact Number
          </div>
          <div className="pl-8 mb-5">
            +44 20 7946 0958
          </div>
          <div className="flex flex-wrap items-center gap-4">Social Media <img className="cursor-pointer" src="/img/Facebook.svg" alt="Facebook" /><img className="cursor-pointer" src="/img/Twitter.svg" alt="Twitter" /><img className="cursor-pointer" src="/img/LinkedIn.svg" alt="LinkedIn" /><img className="cursor-pointer" src="/img/Youtube.svg" alt="YouTube" /><img className="cursor-pointer" src="/img/Instagram.svg" alt="Instagram" /></div>
          
        </div>
      </div>
        <hr className="border-gray-300 mt-10" />
        <div className="grid gap-5 text-black md:grid-cols-2">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
                <p className="cursor-pointer">MENU</p>
                <p className="cursor-pointer">CONTACT US</p>
                <p className="cursor-pointer">PRIVACY POLICY</p>
                <p className="cursor-pointer">TERMS & CONDITION</p>
            </div>

        <div  className="col-span-1 flex justify-center">Copyright © 2026 • Kanakam Home Foods. | Made with ♥ by Ascendtis.</div>
        </div>
    </footer>
  );
};

export default Footer;
