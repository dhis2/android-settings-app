/**
 * return program name, give program id
 * */

export const findProgramNameById = (programList, specificProgram) => {
    const program = programList.find(
        (program) => program.id === specificProgram.id
    )
    return program.name
}
