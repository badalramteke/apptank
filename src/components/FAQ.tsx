import * as React from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "../icons";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do I need to build a working prototype?",
      answer:
        "No! A presentation is mandatory, but building a prototype is optional. However, having a working demo can strengthen your pitch and give you an edge over other teams.",
    },
    {
      question: "Can I participate alone or do I need a team?",
      answer:
        "Both individual participation and team participation (up to 3 members) are welcome. You can register as a solo participant or form a team with fellow students.",
    },
    {
      question: "What should my app idea focus on?",
      answer:
        "Your app should solve real problems faced by students on campus. We have suggested themes like Student Innovation, Smart Education, and Fitness & Sports, but you're free to pitch any innovative idea that addresses campus challenges.",
    },
    {
      question: "How long do I have to present my idea?",
      answer:
        "You'll have a maximum of 5 minutes to present your idea, followed by 2 minutes for Q&A with the judges. Make sure to practice and keep your presentation concise and impactful.",
    },
    {
      question: "Who will judge the presentations?",
      answer:
        "The judging panel includes faculty members, app development heads, and student leaders/secretaries who will evaluate your ideas based on innovation, feasibility, presentation quality, and potential impact.",
    },
    {
      question: "What happens after I submit my registration?",
      answer:
        "After registration closes on September 4th at 12:00 AM, there will be an online shortlisting round. Selected teams will then participate in the offline finale on September 4th at 3:00 PM.",
    },
    {
      question: "Can I change my idea after registration?",
      answer:
        "Minor modifications to your idea are acceptable, but major changes should be avoided. The idea you present should be substantially the same as what you registered with.",
    },
    {
      question: "What do I get for participating?",
      answer:
        "All participants receive a free .com domain and a certificate of participation. The winning team gets development opportunities and Frontend Masters courses worth ₹40,000!",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <HelpCircle className="w-12 h-12 text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Got questions? We've got answers! Find everything you need to know
            about AppTank.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden hover:bg-slate-800/70 transition-all duration-300"
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <div className="text-blue-400 flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-8 pb-6">
                  <div className="border-t border-gray-600 pt-4">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <p className="text-blue-300 font-semibold mb-2">
              Still have questions?
            </p>
            <p className="text-gray-300">
              Contact the organizing team or reach out to us through our social
              media channels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
