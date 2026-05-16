type SectionTitleProps = {
  eyebrow: string
  title: string
  description: string
}

function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700/75">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950 md:text-[1.9rem]">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 md:text-[15px]">
        {description}
      </p>
    </div>
  )
}

export default SectionTitle
