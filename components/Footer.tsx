import React from "react";

const Footer = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <img src="/img/footer.svg" className="ml-10" alt="" />
        </div>
        <div className="col-span-1 text-black">
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
          <div className="flex gap-8">Social Media <img className="cursor-pointer" src="/img/Facebook.svg" alt="" /><img className="cursor-pointer" src="/img/Twitter.svg" alt="" /><img className="cursor-pointer" src="/img/LinkedIn.svg" alt="" /><img className="cursor-pointer" src="/img/Youtube.svg" alt="" /><img className="cursor-pointer" src="/img/Instagram.svg" alt="" /></div>
          
        </div>
      </div>
        <hr className="border-gray-300 mt-10" />
        <div className="">bewonewoi</div>
        <div className="grid grid-cols-2 text-black">
            <div className="col-span-1 flex gap-5  ">
                <p className="cursor-pointer">MENU</p>
                <p className="cursor-pointer">CONTACT US</p>
                <p className="cursor-pointer">PRIVACY POLICY</p>
                <p className="cursor-pointer">TERMS & CONDITION</p>
            </div>

        <div  className="col-span-1 flex justify-center">Copyright © 2026 • Kanakam Home Foods. | Made with ♥ by Ascendtis.</div>
        </div>  
    </>
  );
};

export default Footer;
