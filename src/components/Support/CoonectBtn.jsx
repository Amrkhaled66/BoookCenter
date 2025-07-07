export default function ConnectBtn({ channel, img, link, className }) {
  return (
    <a
      href={link}
      target="_blank"
      className={`group relative w-full cursor-pointer rounded-2xl bg-white px-5 py-4 text-center font-cairo text-sm underline shadow-md drop-shadow-xl transition-all duration-300 sm:w-[90%] lg:w-[80%] lg:text-base ${className}`}
    >
      <span className="group-hover:animate-shake absolute -top-5 right-0 h-9 w-9">
        <img src={img} />
      </span>
      <span>تواصل معانا عن طريق {channel}</span>
    </a>
  );
}
