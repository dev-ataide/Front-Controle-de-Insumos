import Image from "next/image";
import React from "react";
import Link from "next/link";
import styles from "../../../../styles/css";

export default function Nav() {

    return (
        <main className="mx-20 my-16 font-semibold">
            <div className="flex justify-between">
                <div className="flex  gap-16">
                    <Image
                        src="/Type=Logo, Dark=Yes.png   "
                        alt="agendahub"
                        className=""
                        width={45}
                        height={30}
                        priority />
                    <div className="flex items-center justify-around text-black cursor-pointer gap-12">
                        <a href="">
                            <h1 className="mr-10">Produtos</h1>
                        </a>
                        <a href="/">
                            <h1>Home</h1>
                        </a>
                        <a href="">
                            <h1>Investimento</h1>
                        </a>
                        <a href="/funcionalidade">
                            <h1>Funcionalidades</h1>
                        </a>
                        <a href="">
                            <h1>Automações</h1>
                        </a>

                    </div>

                </div>
                <div className="flex">

                    <div className="flex items-center justify-center text-black cursor-pointer gap-12">
                        <h1>
                            <Link href="/signin">
                                Login
                            </Link>

                        </h1>

                        <button className=" rounded-3xl bg-aftb_orange p-3 text-white">
                            <Link href="/signup">
                                Start for free

                            </Link>
                        </button>

                    </div>

                </div>

            </div>

        </main >

    )


}