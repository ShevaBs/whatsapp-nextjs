import Loader from "react-loader-spinner";



function Loading() {
  return (
    <center style={{display: 'grid', placeItems: 'center', height: "100vh"}}>
      <div>
      <img 
        src="https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png" 
        alt="logo" 
        height={200}
        style={{marginBottom: 10}}
        />
      <Loader
        type="Oval"
        color="#25b873"
        height={60}
        width={60}
      />
      </div>
    </center>
  )
}

export default Loading
