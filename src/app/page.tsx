import Image from "next/image";
export default function Home() {
  return (
    <main className="absolute inset-0 flex justify-center items-center bg-black">
      <Image
        className="flex justify-center items-center mx-auto"
        src="/logo.jpeg"
        width={250}
        height={250}
        alt="Deloitte logo"
      />
    </main>
  );
}
