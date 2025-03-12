const Footer=()=>{
  return(
      <div className="bg-blue-500 py-8">
          <div className="container mx-auto flex justify-between items-centre">
              <span className="text-2xl text-white font-bold tack-tight">
                  MernHolidays.com
              </span>
              <span className="text-white font-bold tracking-tight flex gap-4">
                  <p className="cursor-pointer">Privacy Policy</p>
                  <p className="cursor-pointer">Terms of Service</p>
              </span>

          </div>
      </div>
  );
};
export default Footer;
