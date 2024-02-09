import Link from "next/link";
import { MdOutlineAccountCircle } from "react-icons/md";

const data = [
  {
    id: 1,
    lesson: 1,
    homeworks: [
      {
        id: 1,
        title: "Ikkita sonni yig'indisi",
        input: [12, 24],
        output: 41,
      },
      {
        id: 2,
        title: "Yoshni hisoblash",
        input: [2001, 2024],
        output: 23,
      },
      {
        id: 3,
        title: "Kalkulator yasash",
        input: [12, 24, "+"],
        output: 36,
      },
    ],
  },
  {
    id: 2,
    lesson: 2,
    homeworks: [
      {
        id: 1,
        title: "Ikkita sonni yig'indisi",
        input: [12, 24],
        output: 41,
      },
      {
        id: 1,
        title: "Yoshni hisoblash",
        input: [2001, 2024],
        output: 23,
      },
      {
        id: 1,
        title: "Kalkulator yasash",
        input: [12, 24, "+"],
        output: 36,
      },
    ],
  },
];
export default function Home() {
  return (
    <main className="bg-slate-800 w-full min-h-dvh flex flex-col text-gray-100">
      <div className="container mx-auto my-10">
        <nav className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Uyga vazifalar ro'yxati</h1>
          <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-4xl select-none cursor-pointer">
            <MdOutlineAccountCircle />
          </div>
        </nav>
        <div className="mt-14 mx-auto w-3/4">
          {data.map((lesson) => {
            return (
              <div key={lesson.lesson}>
                <h1 className="text-4xl my-8">{lesson.lesson} - Dars</h1>
                <div className="flex gap-5 flex-col">
                  {lesson.homeworks.map((homework, i) => {
                    return (
                      <div
                        className="w-full bg-slate-700 h-20 rounded-xl flex items-center px-5 hover:bg-slate-600 duration-200  justify-between"
                        key={i}
                      >
                        <div className="flex items-center gap-3">
                          <p className="text-xl">
                            {lesson.lesson}.{i}
                          </p>
                          <p className="text-xl">{homework.title}</p>
                        </div>
                        <Link
                          href={"/homework/" + lesson.id + "/" + homework.id}
                          className="w-max px-5 py-2 font-sans font-medium bg-blue-500 rounded-xl"
                        >
                          Yechish
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
