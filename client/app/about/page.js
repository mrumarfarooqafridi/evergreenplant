import Image from "next/image";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-10 shadow-[0_30px_80px_rgba(16,185,129,0.08)] mb-14">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-700 mb-4">
              About the Nursery
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Growing inspiration and green spaces since 2020
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
              Evergreen Nursery brings premium indoor and outdoor plants to UAE
              homes and offices with thoughtful care, expert guidance, and a
              love for sustainable greenery.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.95fr] items-center">
            <div className="space-y-6 text-slate-700">
              <div>
                <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
                <p className="text-base leading-8">
                  What began as a family passion project has grown into a
                  trusted Dubai nursery delivering premium plants, expert care,
                  and distinctive garden experiences across the UAE.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Heritage
                  </h3>
                  <p className="text-slate-600 leading-7">
                    Rooted in thoughtful cultivation, we source only the
                    healthiest plants and nurture every customer relationship.
                  </p>
                </div>
                <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Craftsmanship
                  </h3>
                  <p className="text-slate-600 leading-7">
                    Each plant arrives ready to flourish, curated with premium
                    soil, styling, and plant care expertise.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="/about.png"
                alt="About Evergreen Nursery"
                width={900}
                height={700}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-8">
              <h2 className="text-3xl font-semibold mb-4 text-slate-900">
                Our Mission
              </h2>
              <p className="text-slate-600 leading-8">
                To make premium plants and thoughtful gardening support
                accessible for every home and workplace in the UAE, while
                delivering an elevated customer experience.
              </p>
            </div>
            <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-8">
              <h2 className="text-3xl font-semibold mb-4 text-slate-900">
                Our Vision
              </h2>
              <p className="text-slate-600 leading-8">
                To become the region&apos;s most trusted nursery brand, known for
                sustainability, design, and exceptional care in every plant we
                deliver.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-10 text-slate-900">
            Why Choose Us?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4 text-emerald-600">🌱</div>
              <h3 className="text-xl font-semibold mb-3">Quality Plants</h3>
              <p className="text-slate-600 leading-7">
                Handpicked selections, carefully nurtured for longevity and
                beauty.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4 text-emerald-600">🚚</div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-slate-600 leading-7">
                Reliable, on-time delivery across Dubai and the UAE.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4 text-emerald-600">💬</div>
              <h3 className="text-xl font-semibold mb-3">Expert Advice</h3>
              <p className="text-slate-600 leading-7">
                Professional guidance to help every plant thrive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
