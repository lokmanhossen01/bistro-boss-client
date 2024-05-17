const SectionTitle = ({heading, subHeading}) => {
    return(
        <div className="md:w-3/12 mx-auto my-8 text-center">
            <p className="text-yellow-600  mb-2  ">---{subHeading}---</p>
            <h3 className="text-3xl border-y-4 py-4 uppercase">{heading}</h3>
        </div>
    )
}

export default SectionTitle; 