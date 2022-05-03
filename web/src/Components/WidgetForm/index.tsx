import { useState } from "react";

import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSucessStep } from './Steps/FeedbackSucessStep';

import bugImage from '../../assets/bug.svg';
import ideaImage from '../../assets/idea.svg';
import toughtImage from '../../assets/thought.svg';

export const feedBackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImage,
            alt: 'Imagem de um inseto',
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaImage,
            alt: 'Imagem de uma lámpada',
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            source: toughtImage,
            alt: 'Imagem de uma núvem de pensamento',
        }
    }
}

export type FeedbackType = keyof typeof feedBackTypes;

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSend, setFeedbackSend] = useState<boolean>(false);

    function handleRestartFeedback() {
        setFeedbackSend(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadown-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSend ? (
                <FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedback} />
            ) : (
                <>{

                    !feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSend={() => setFeedbackSend(true)}
                        />
                    )
                }
                </>
            )
            }

            <footer>
                Feito  por <a className="underline underline-offset-2" href="https://www.linkedin.com/in/danilo-ryan-oliveira-b75a4a1a1/" target="_blank">Danilo Ryan Oliveira </a>
            </footer>
        </div>
    )
}