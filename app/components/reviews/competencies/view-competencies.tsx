import { Competency } from "@prisma/client";
import { Question } from "phosphor-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { competencyLevels } from "~/utils/constants";

type ViewCompetenciesProps = {
  competencies: any;
};

export default function ViewCompetencies({
  competencies,
}: ViewCompetenciesProps): JSX.Element {
  return (
    <div>
      <Accordion type="multiple" className="w-full">
        {competencies.map((competency: any, index: number) => (
          <AccordionItem key={competency.id} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex flex-row space-x-1 items-center">
                <h2 className="mb-2">{competency.competency.name}</h2>

                <div className="pb-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Question />
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-white">
                        {competency.competency.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>Supervisor Score: </strong>
                {competencyLevels[competency.supervisorScore]}
              </p>
              <p>
                <strong>Supervisor feedback: </strong>
                {competency.supervisorFeedbackText}
              </p>
              <div className="pt-4 w-full "></div>
              <p>
                <strong>Employee Score: </strong>
                {competencyLevels[competency.employeeScore] ??
                  " TBD by employee"}
              </p>
              <p>
                <strong>Employee feedback: </strong>
                {competency.employeeFeedbackText ?? " TBD by employee"}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
