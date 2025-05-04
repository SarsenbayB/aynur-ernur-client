import React from "react";
import "../css/iconfonts.css"

const Footer: React.FC = () => {
    return (
        <footer className="py-5 flex w-full flex-col items-center bg-gray-800 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center text-3xl font-bold hover:text-yellow-400 transition duration-1000">
                    АЙНҰР-ЕРНҰР
                </div>
                <div className="text-center mt-4">
                    Бізбен байланысыңыз
                    <div className="flex justify-center mt-2 space-x-4">
                        <a className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full shadow-md transition-transform hover:-translate-y-1 relative overflow-hidden" href="http://facebook.com">
                            <i className="icon-facebook-f text-xl text-gray-600 hover:text-white"></i>
                        </a>
                        <a className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full shadow-md transition-transform hover:-translate-y-1 relative overflow-hidden" href="https://shorturl.at/fCDF7">
                            <i className="icon-instagram text-xl text-gray-600 hover:text-white"></i>
                        </a>
                        <a className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full shadow-md transition-transform hover:-translate-y-1 relative overflow-hidden" href="https://wa.me/+77473009392">
                            <i className="icon-whatsapp text-xl text-gray-600 hover:text-white"></i>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center mt-6 px-4">
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold">"АЙНҰР-ЕРНҰР" бөбекжай балабақшасы</h4>
                        <p className="font-semibold hover:text-yellow-400 transition duration-500">
                            Түркістан Облысы, Мақтаарал Ауданы, Атакент Кенті, Нұрлы әлем көшесі, №2 ғим.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <p className="flex items-center">
                            <span className="mr-2">tel:</span>
                            <a className="px-3 py-1 bg-yellow-500 text-white rounded transition hover:bg-yellow-600" href="tel:+77471243570">
                                +7(747)124 35 70
                            </a>
                        </p>
                        <p className="flex items-center mt-2">
                            <span className="mr-2">tel:</span>
                            <a className="px-3 py-1 bg-yellow-500 text-white rounded transition hover:bg-yellow-600" href="tel:+77473009392">
                                +7(747)300 93 92
                            </a>
                        </p>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <h4 className="inline-block mr-2">АЙНҰР-ЕРНҰР бөбекжай балабақшасы</h4> 2014-2024
                </div>
            </div>
        </footer>
    );
};

export default Footer;
