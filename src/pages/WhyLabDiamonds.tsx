import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd, breadcrumbs } from "@/components/JsonLd";
import { Link } from "react-router-dom";
import { Sparkles, Palette, Microscope, Scale, FileCheck, Download, ArrowRight, Flame, Zap, ShieldCheck, Leaf, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import cvdDiamonds from "@/assets/cvd-diamonds.png";
import { Button } from "@/components/ui/button";

/* ── Grade Pill Stack (shared with About.tsx) ── */
const GradeStack = ({ grades, nooriIndex }: { grades: string[]; nooriIndex: number }) => (
  <div className="flex flex-col-reverse gap-1.5 w-32">
    {grades.map((grade, i) => {
      const isNoori = i === nooriIndex;
      return (
        <div
          key={grade}
          className={`px-3 py-2 rounded-lg text-center tracking-wide transition-all ${
            isNoori
              ? "bg-accent text-white font-semibold text-sm shadow-[0_0_16px_hsl(45_70%_50%/0.3)]"
              : "bg-foreground/[0.06] text-foreground/40 text-xs"
          }`}
        >
          {grade}
        </div>
      );
    })}
  </div>
);

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function WhyLabDiamonds() {
  const fourCs = [
    { name: "Cut", icon: <Sparkles className="w-6 h-6" />, grade: "Excellent", description: "The highest cut grade possible. Our diamonds are precision-cut to ideal proportions, maximising brilliance, fire, and scintillation from every angle. Light enters and exits exactly as intended.", scale: ["Poor", "Fair", "Good", "V. Good", "Excellent"], nooriIndex: 4 },
    { name: "Colour", icon: <Palette className="w-6 h-6" />, grade: "D–F Colorless", description: "Graded in the D–F range — the purest colour grades on the scale. Completely colorless to the naked eye and even under 10x magnification. No warmth, no yellow tint.", scale: ["M–Z", "K–L", "G–J", "D–F"], nooriIndex: 3 },
    { name: "Clarity", icon: <Microscope className="w-6 h-6" />, grade: "VVS1–VS1", description: "Inclusions are so small they are invisible to the naked eye and difficult to find even under 10x magnification. These are eye-clean diamonds at the top of the clarity scale.", scale: ["I", "SI", "VS2", "VVS1–VS1"], nooriIndex: 3 },
    { name: "Carat", icon: <Scale className="w-6 h-6" />, grade: "Full Range", description: "Available from delicate 0.5ct studs to statement 4ct pieces. Lab-grown diamonds carry the same weight as mined — because they are the same material.", scale: null, nooriIndex: null },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Why Lab-Grown Diamonds? | Noori — The Science Behind the Sparkle"
        description="Lab-grown diamonds are chemically, physically, and optically identical to mined diamonds — at 40-60% less cost. Learn about CVD technology, IGI certification, and why Noori chooses lab-grown."
        path="/why-lab-diamonds"
      />
      <JsonLd data={breadcrumbs([{ name: "Home", url: "/" }, { name: "Why Lab-Grown Diamonds", url: "/why-lab-diamonds" }])} />
      <Header />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-4 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.8 }}>
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-4">The Science of Brilliance</p>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight max-w-3xl mx-auto">
              Why lab-grown <span className="italic">diamonds?</span>
            </h1>
            <p className="text-base md:text-lg text-foreground/60 mt-6 max-w-xl mx-auto leading-relaxed">
              Chemically, physically, and optically identical to mined diamonds. The only difference is where they begin.
            </p>
          </motion.div>
        </section>

        {/* ── What Are Lab-Grown Diamonds — with image ── */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/40 mb-4">The Fundamentals</p>
              <h2 className="font-display text-3xl md:text-5xl font-light mb-8">
                A diamond is a diamond.
              </h2>
              <div className="space-y-6 text-foreground/70 text-base md:text-lg leading-relaxed">
                <p>
                  Lab-grown diamonds are real diamonds. They share the exact same chemical composition — pure crystallised carbon — the same crystal structure, and the same optical properties as diamonds formed deep in the Earth.
                </p>
                <p>
                  Under a jeweler's loupe, under a microscope, and even under advanced gemological testing equipment, they are indistinguishable from mined stones. The IGI grades them on the same 4Cs scale as mined diamonds.
                </p>
                <p>
                  The only difference is origin. One formed over billions of years underground. The other was created in weeks, in a controlled environment, by replicating the same conditions.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }}>
              <img
                src={cvdDiamonds}
                alt="Raw CVD lab-grown diamond plates alongside cut brilliant diamonds"
                className="w-full rounded-2xl object-cover aspect-[3/2]"
              />
              <p className="text-xs text-foreground/40 mt-3 text-center">
                Raw CVD diamond plates before cutting, alongside finished brilliant-cut stones.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── How They're Made ── */}
        <section className="py-16 md:py-24 px-4 bg-secondary/20">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="mb-14">
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/40 mb-4">The Process</p>
              <h2 className="font-display text-3xl md:text-5xl font-light">
                How they're made.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* CVD */}
              <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="p-8 rounded-2xl border border-accent/30 bg-accent/5">
                <div className="flex items-center gap-3 mb-6">
                  <Flame className="w-6 h-6 text-accent" />
                  <div>
                    <h3 className="font-display text-2xl text-foreground">CVD</h3>
                    <p className="text-xs text-accent uppercase tracking-widest">Our method</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">Chemical Vapor Deposition</p>
                <p className="text-foreground/70 leading-relaxed">
                  A thin diamond seed is placed inside a sealed chamber. Carbon-rich gas — typically methane — is heated to around 1,500°F. The gas breaks down and carbon atoms begin to attach to the seed, layer by layer, atom by atom. Over two to four weeks, a rough diamond crystal forms.
                </p>
                <p className="text-foreground/70 leading-relaxed mt-4">
                  CVD produces diamonds with exceptional purity. Noori uses this method exclusively because it yields Type IIa diamonds — the purest form, representing less than 2% of all diamonds on Earth.
                </p>
              </motion.div>

              {/* HPHT */}
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="p-8 rounded-2xl border border-border/40">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-foreground/50" />
                  <h3 className="font-display text-2xl text-foreground">HPHT</h3>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">High Pressure High Temperature</p>
                <p className="text-foreground/70 leading-relaxed">
                  This method mimics the conditions found deep in the Earth's mantle. A carbon source is placed under extreme pressure (about 1.5 million pounds per square inch) and heated to over 2,700°F. Under these conditions, carbon atoms crystallise around a small diamond seed.
                </p>
                <p className="text-foreground/70 leading-relaxed mt-4">
                  HPHT was the first method used to create lab-grown diamonds in the 1950s. It remains widely used today, particularly for industrial applications and colour-enhanced stones.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Why We Chose Lab-Grown ── */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="mb-14">
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/40 mb-4">Our Choice</p>
              <h2 className="font-display text-3xl md:text-5xl font-light leading-snug">
                Real diamonds. <span className="italic">Better origin.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <DollarSign className="w-5 h-5" />, num: "40–60%", label: "Less than mined diamonds", body: "Same quality, same brilliance — without the inflated supply chain. More diamond for your investment." },
                { icon: <ShieldCheck className="w-5 h-5" />, num: "100%", label: "Conflict-free", body: "Every Noori diamond is traceable from creation to setting. No mining communities displaced, no conflict financing." },
                { icon: <Leaf className="w-5 h-5" />, num: "Zero", label: "Mining required", body: "No open-pit mines, no deforestation, no water table disruption. A fraction of the environmental footprint." },
              ].map(({ icon, num, label, body }, i) => (
                <motion.div
                  key={num}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-border/40"
                >
                  <div className="text-accent mb-4">{icon}</div>
                  <span className="font-display text-5xl font-light text-accent leading-none tracking-tight block">{num}</span>
                  <span className="text-sm text-foreground/50 mt-2 block uppercase tracking-widest">{label}</span>
                  <p className="text-sm text-foreground/60 mt-4 leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The 4Cs ── */}
        <section className="py-16 md:py-24 px-4 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="mb-14">
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/40 mb-4">Our Standard</p>
              <h2 className="font-display text-3xl md:text-5xl font-light">
                The <span className="noor-glow">4Cs</span>
              </h2>
              <p className="text-foreground/60 mt-4 max-w-lg leading-relaxed">
                Every Noori diamond is graded at the top of every scale. We don't compromise on a single C.
              </p>
            </motion.div>

            <div>
              {fourCs.map((c, index) => (
                <motion.div
                  key={c.name}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="border-t border-border py-10 md:py-14 grid grid-cols-12 gap-6 md:gap-10 items-start"
                >
                  <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                    <div className="text-accent">{c.icon}</div>
                    <h3 className="font-display text-2xl md:text-3xl text-foreground">{c.name}</h3>
                  </div>
                  <div className="col-span-8 md:col-span-5">
                    <p className="text-base text-foreground/70 leading-relaxed">{c.description}</p>
                  </div>
                  <div className="col-span-4 md:col-span-3 flex justify-end">
                    {c.scale && c.nooriIndex !== null ? (
                      <GradeStack grades={c.scale} nooriIndex={c.nooriIndex} />
                    ) : (
                      <span className="bg-accent text-white text-[10px] uppercase tracking-widest font-semibold px-4 py-2 rounded-full">
                        {c.grade}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-border" />
            </div>
          </div>
        </section>

        {/* ── Certification ── */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="border border-border rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="shrink-0 mx-auto md:mx-0">
                  <div className="w-20 h-28 border border-accent rounded-xl bg-accent/5 flex flex-col items-center justify-center gap-2">
                    <FileCheck className="w-7 h-7 text-accent" />
                    <span className="text-[9px] text-accent font-semibold tracking-[0.15em] uppercase">Certified</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-display text-xl mb-2 text-foreground">IGI Certification</h4>
                  <p className="text-sm text-foreground/70 mb-4">
                    Every Noori diamond comes with independent certification from the International Gemological Institute (IGI), verifying cut, colour, clarity, and carat weight. Each certificate includes a unique ID laser-inscribed on your diamond.
                  </p>
                  <div className="space-y-2 mb-4">
                    {["Unique certificate number", "Diamond measurements and proportions", "4Cs grading with visual diagrams", "Laser inscription ID"].map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span className="text-sm text-foreground/70">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Sample Certificate
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 md:py-24 px-4 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
            <h2 className="font-display text-3xl md:text-4xl font-light mb-6">See for yourself.</h2>
            <p className="text-foreground/60 mb-8 max-w-md mx-auto">
              Explore the Vela Collection — lab-grown diamonds set in 14K and 18K gold, crafted to last forever.
            </p>
            <Link to="/collections/solitaires">
              <Button className="btn-hero gap-2 text-base px-8 py-6">
                Explore the Vela Collection
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
