import Image from "next/image";
import styles from './Profile.module.scss';

const Profile = ({ user }) => {
  return (
    <div id={styles.profile}>
      <Image className={styles.pp} src={user.profile} width={50} height={50} alt='profile' />
      <h1>{user.firstname}</h1>
    </div>
  )
}

export default Profile;