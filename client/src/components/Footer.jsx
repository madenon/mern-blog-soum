import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import React from "react";
import Logo from "../assets/assets/logo.png";

import { BsFacebook, BsInstagram, BsTwitter, BsGoogle } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer
      container
      className="border 
    border-t-8 border-teal-500"
    >
      <div className=" w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="">
            <Link
              to="/"
              className="self-center whitespace-nowrap
       text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span>
              <img src={Logo} alt="Logo"  className="px-2 py-1 
      bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 text-white w-10 h-10 rounded-full"/>
              </span>
           
            </Link>
          </div>
          <div
            className="grid 
          grid-cols-2  gap-8
           mt-4 sm:grid-cols-2 sm:gap-6"
          >
            <div>
              <Footer.Title title="A propos" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://votre-agence-immo.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Un projet de Agence immobilère
                </Footer.Link>

                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  A propos
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Suivez-nous sur" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Footer.Link>

                <Footer.Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">politique de confidentialité</Footer.Link>

                <Footer.Link href="#">
                  Les &amp; Conditions d'utilisations
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
       <div className="w-full sm:flex sm:items-center sm:justify-between">

       <Footer.Copyright
          href="#"
          by="Soumahoro  blog"
          year={new Date().getFullYear()}
        />
        <div className="flex justify-center gap-8 mt-4 sm:mt-0">
          <Footer.Icon href="https://facebook.com" icon={BsFacebook} />
          <Footer.Icon href="https://instagram.com" icon={BsInstagram} />
          <Footer.Icon href="#" icon={BsTwitter} />
          <Footer.Icon
            href="https://votre-agence-immo.onrender.com"
            icon={BsGoogle}
          />
        </div>
       </div>
      </div>
    </Footer>
  );
}
