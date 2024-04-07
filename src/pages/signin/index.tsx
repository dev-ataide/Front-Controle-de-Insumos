import { useContext, FormEvent, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/logo.svg';

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { toast } from 'react-toastify'

import { AuthContext } from '../../contexts/AuthContext'

import Link from 'next/link';

import { canSSRGuest } from '../../utils/canSSRGuest'
import Nav from '../../components/landing_page/navbar/nav';

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.error("Preencha os campos")
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false);
  }

  return (
    <>
    <Nav/>
    <Head>
      <title>AgendaMAX - Faça seu login</title> 
    </Head>

    </>
  )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})
{/* <div classNameName={styles.containerCenter}>
<Image src={logoImg} alt="Logo Sujeito Pizzaria" />

<div classNameName={styles.login}>
  <form onSubmit={handleLogin}>
    <Input
      placeholder="Digite seu email"
      type="text"
      value={email}
      onChange={ (e) => setEmail(e.target.value) }
    />

    <Input
      placeholder="Sua senha"
      type="password"
      value={password}
      onChange={ (e) => setPassword(e.target.value) }
    />
    
    <Button
      type="submit"
      loading={loading}
    >
      Acessar
    </Button>
  </form>

  <Link href="/signin">
     <a classNameName={styles.text}>Nao possui uma conta? Cadastre-se</a>
  </Link>

</div>
</div> */}