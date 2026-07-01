import banner1 from "./../assets/Banner_01.png";
// import banner2 from "./../assets/Banner_02.png";
// import banner3 from "./../assets/Banner_03.png";

export default function Home() {
  return (
    <div className="prose max-w-none">
      {/* Optional introduction content */}
      {/* 
      <h1>Welcome</h1>
      <p>This is a simple MERN demo with role-based (RBAC) authentication and file uploads.</p>
      <ul>
        <li>Admin can see and modify anything.</li>
        <li>IT Office can manage IT documents.</li>
        <li>Proctorial Office can manage Proctorial documents.</li>
      </ul> 
      */}

      <div className="w-full relative z-0">
        <img 
          src={banner1} 
          alt="Banner_1" 
          className="w-full h-auto object-cover" 
        />
      </div>
    </div>
  );
}
