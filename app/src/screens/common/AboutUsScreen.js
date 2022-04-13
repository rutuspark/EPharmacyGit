import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer"; 

const AboutUsScreen = () => {
    return (
        <div>
            <Navigation/>
            <div className="main1">
            <h3>About Us : </h3>
            <br></br>
            <p>
                <b>Who we are - India's most convenient online pharmacy</b><br></br>
                epharmacy.com, India Ki Pharmacy, is brought to you by the Dadha & Company – one of India’s 
                most trusted pharmacies, with over 100 years’ experience in dispensing quality medicines. 
                At epharmacy.com, we help you look after your own health effortlessly as well as take care of 
                loved ones wherever they may reside in India. 
                You can buy and send medicines from any corner of the country - with just a few clicks of the mouse.
             
            </p>
            <p>
                <b>What we do – Offer fast online access to medicines with convenient home delivery</b><br></br>
                At epharmacy.com, we make a wide range of prescription medicines and other health products conveniently 
                available all across India. Even second and third tier cities and rural villages can now have access to the 
                latest medicines. 
                Since we also offer generic alternatives to most medicines, online buyers can expect significant savings.
            </p>
            
        </div>
        </div>
    );
}
export default AboutUsScreen