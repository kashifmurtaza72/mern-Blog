import CallToAction from "../components/CallToAction";
export default function Projects() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex flex-col justify-center items-center gap-6 ">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-gray-500">
        Build fun and engaging projects while learning advance features in
        React, NodeJS, Mongoose and Express.
      </p>
      <CallToAction />
    </div>
  );
}
