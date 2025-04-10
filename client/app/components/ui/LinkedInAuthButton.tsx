import handleLinkedInAuth from "@/lib/api/linkedin";

export default function GithubAuthButton() {
  

  return(
    <button
      onClick={() => {
        console.log(handleLinkedInAuth("shawnn24"));
      }}
      className={`w-60 transform rounded-lg px-6 py-2 font-medium transition-all duration-300 justify-items-center
        ${true ? 'bg-[#56b856] text-black' : 'bg-[#0077B5] hover:bg-[#0085cc] hover:-translate-y-0.5 text-white'}`
      }
      disabled={false}
    >
      {true ? 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg> 
      : 
      <p>Github</p>
      }
    </button>
  );
}