import React, { useState } from "react";
import Link from 'next/link'
import { BsChevronDown } from "react-icons/bs";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
  { id: 1, name: "Jordan", doc_count: 11 },
  { id: 2, name: "Sneakers", doc_count: 8 },
  { id: 3, name: "Running shoes", doc_count: 64 },
  { id: 4, name: "Football shoes", doc_count: 107 },
];

const MenuMobile = ({ setMobileMenu }) => {
  const [showCatMenu, setShowCatMenu] = useState(false);

  const handleCategoryClick = () => {
    setShowCatMenu(!showCatMenu);
  };

  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {data.map((item) => (
        <li
          key={item.id}
          className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
          onMouseEnter={() => {
            if (item.subMenu) setShowCatMenu(true);
          }}
          onMouseLeave={() => {
            if (item.subMenu) setShowCatMenu(false);
          }}
        >
          {item.subMenu ? (
            <>
              <div
                className="flex justify-between items-center"
                onClick={handleCategoryClick}
              >
                {item.name}
                <BsChevronDown size={14} />
              </div>

              {showCatMenu && (
                <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                  {subMenuData.map(({ id, name, doc_count }) => (
                    <Link
                      key={id}
                      href={`/category/${name.toLowerCase().replace(" ", "-")}`}
                      onClick={() => setMobileMenu(false)}
                    >
                      <li className="py-4 px-8 border-t flex justify-between">
                        {name}
                        <span className="opacity-50 text-sm">{`(${doc_count})`}</span>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <Link
              href={item?.url}
              onClick={() => {
                setMobileMenu(false);
                setShowCatMenu(false);
              }}
            >
              <span>{item.name}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuMobile;
