import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css';

export default function Component() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
      <div className={styles.main}>
        Signed in as {session.user.email} <br />
        <img src={session.user.image} /> <br />
        {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>     
      </div>
      </>
    )
  }
  return (
    <>
    <div className={styles.main}>
      <div className={styles.loginCont}>
        <img src="logo.png"/>
      <h1>Random Blog Post</h1>
      <p className={styles.slogan}>You are not signed in yet <br /></p>
      <button className={styles.commentButton} onClick={() => signIn()}>Sign in</button>
      </div>
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if(session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}