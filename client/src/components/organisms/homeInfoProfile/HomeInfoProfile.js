import HomeInfo from "../../molecules/homeInfo/HomeInfo";
import HomeProfile from "../../molecules/homeProfile/HomeProfile";

const HomeInfoProfile = ({
    user,
    role
}) => {
    return (
        <>
            <HomeInfo />
            <HomeProfile user={user} role={role} />
        </>
    );
}
 
export default HomeInfoProfile;