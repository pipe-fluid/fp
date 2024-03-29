import { prisma } from "~/db.server";

export async function getAllCompetenciesFromDepartmentByTeamId(teamId: number) {
  // Find the department linked to the team
  const teamWithDepartment = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      department: true,
    },
  });

  const departmentId = teamWithDepartment?.department?.id;

  if (!departmentId) {
    throw new Error("Department not found for the given team");
  }

  // Fetch competencies linked to the department
  const competencies = await prisma.competency.findMany({
    where: {
      departmentId: departmentId,
    },
  });

  return competencies;
}
