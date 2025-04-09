import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type NoteType = "quote" | "reflection" | "memorable";

interface RadioButtonsProps {
    value: NoteType;
    onChange: (value: NoteType) => void;
}

const RadioButtons = ({ value, onChange }: RadioButtonsProps) => {
    return (
        <RadioGroup
            value={value}
            onValueChange={(val) => onChange(val as NoteType)}
        >
            <section className="flex gap-6">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reflection" id="reflection" />
                    <Label htmlFor="reflection">Reflections</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quote" id="quote" />
                    <Label htmlFor="quote">Quotes</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="memorable" id="memorable" />
                    <Label htmlFor="memorable">Memorables</Label>
                </div>
            </section>
        </RadioGroup>
    );
};

export default RadioButtons;
