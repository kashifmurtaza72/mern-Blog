import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Learn to more about Javascript?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with 100 Javascript projects
        </p>
        <a
          href="/search?searchTerm=&order=desc&category=javascript"
          rel="noopener noreferrer"
        >
          <Button
            gradientDuoTone="purpleToPink"
            className="rounded-tl-xl rounded-bl-none"
          >
            Learn More
          </Button>
        </a>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
