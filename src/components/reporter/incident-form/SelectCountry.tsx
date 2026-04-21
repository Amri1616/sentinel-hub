import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTranslation } from 'react-i18next'

export const countries = [
  { label: "Afghanistan", value: "afghanistan" },
  { label: "Albania", value: "albania" },
  { label: "Algeria", value: "algeria" },
  { label: "American Samoa", value: "american samoa" },
  { label: "Andorra", value: "andorra" },
  { label: "Angola", value: "angola" },
  { label: "Anguilla", value: "anguilla" },
  { label: "Antarctica", value: "antarctica" },
  { label: "Antigua and Barbuda", value: "antigua and barbuda" },
  { label: "Argentina", value: "argentina" },
  { label: "Armenia", value: "armenia" },
  { label: "Aruba", value: "aruba" },
  { label: "Australia", value: "australia" },
  { label: "Austria", value: "austria" },
  { label: "Azerbaijan", value: "azerbaijan" },
  { label: "Bahamas", value: "bahamas" },
  { label: "Bahrain", value: "bahrain" },
  { label: "Bangladesh", value: "bangladesh" },
  { label: "Barbados", value: "barbados" },
  { label: "Belarus", value: "belarus" },
  { label: "Belgium", value: "belgium" },
  { label: "Belize", value: "belize" },
  { label: "Benin", value: "benin" },
  { label: "Bermuda", value: "bermuda" },
  { label: "Bhutan", value: "bhutan" },
  { label: "Bolivia", value: "bolivia" },
  { label: "Bosnia and Herzegovina", value: "bosnia and herzegovina" },
  { label: "Botswana", value: "botswana" },
  { label: "Bouvet Island", value: "bouvet island" },
  { label: "Brazil", value: "brazil" },
  { label: "British Indian Ocean Territory", value: "british indian ocean territory" },
  { label: "Brunei Darussalam", value: "brunei darussalam" },
  { label: "Bulgaria", value: "bulgaria" },
  { label: "Burkina Faso", value: "burkina faso" },
  { label: "Burundi", value: "burundi" },
  { label: "Cambodia", value: "cambodia" },
  { label: "Cameroon", value: "cameroon" },
  { label: "Canada", value: "canada" },
  { label: "Cape Verde", value: "cape verde" },
  { label: "Cayman Islands", value: "cayman islands" },
  { label: "Central African Republic", value: "central african republic" },
  { label: "Chad", value: "chad" },
  { label: "Chile", value: "chile" },
  { label: "China", value: "china" },
  { label: "Christmas Island", value: "christmas island" },
  { label: "Cocos (Keeling) Islands", value: "cocos (keeling) islands" },
  { label: "Colombia", value: "colombia" },
  { label: "Comoros", value: "comoros" },
  { label: "Congo", value: "congo" },
  { label: "Cook Islands", value: "cook islands" },
  { label: "Costa Rica", value: "costa rica" },
  { label: "Cote D'Ivoire", value: "cote d'ivoire" },
  { label: "Croatia", value: "croatia" },
  { label: "Cuba", value: "cuba" },
  { label: "Cyprus", value: "cyprus" },
  { label: "Czech Republic", value: "czech republic" },
  { label: "Denmark", value: "denmark" },
  { label: "Djibouti", value: "djibouti" },
  { label: "Dominica", value: "dominica" },
  { label: "Dominican Republic", value: "dominican republic" },
  { label: "Ecuador", value: "ecuador" },
  { label: "Egypt", value: "egypt" },
  { label: "El Salvador", value: "el salvador" },
  { label: "Equatorial Guinea", value: "equatorial guinea" },
  { label: "Eritrea", value: "eritrea" },
  { label: "Estonia", value: "estonia" },
  { label: "Ethiopia", value: "ethiopia" },
  { label: "Falkland Islands (Malvinas)", value: "falkland islands (malvinas)" },
  { label: "Faroe Islands", value: "faroe islands" },
  { label: "Fiji", value: "fiji" },
  { label: "Finland", value: "finland" },
  { label: "France", value: "france" },
  { label: "French Guiana", value: "french guiana" },
  { label: "French Polynesia", value: "french polynesia" },
  { label: "French Southern Territories", value: "french southern territories" },
  { label: "Gabon", value: "gabon" },
  { label: "Gambia", value: "gambia" },
  { label: "Georgia", value: "georgia" },
  { label: "Germany", value: "germany" },
  { label: "Ghana", value: "ghana" },
  { label: "Gibraltar", value: "gibraltar" },
  { label: "Greece", value: "greece" },
  { label: "Greenland", value: "greenland" },
  { label: "Grenada", value: "grenada" },
  { label: "Guadeloupe", value: "guadeloupe" },
  { label: "Guam", value: "guam" },
  { label: "Guatemala", value: "guatemala" },
  { label: "Guinea", value: "guinea" },
  { label: "Guinea-Bissau", value: "guinea-bissau" },
  { label: "Guyana", value: "guyana" },
  { label: "Haiti", value: "haiti" },
  { label: "Heard Island and Mcdonald Islands", value: "heard island and mcdonald islands" },
  { label: "Holy See (Vatican City State)", value: "holy see (vatican city state)" },
  { label: "Honduras", value: "honduras" },
  { label: "Hong Kong", value: "hong kong" },
  { label: "Hungary", value: "hungary" },
  { label: "Iceland", value: "iceland" },
  { label: "India", value: "india" },
  { label: "Indonesia", value: "indonesia" },
  { label: "Iran", value: "iran" },
  { label: "Iraq", value: "iraq" },
  { label: "Ireland", value: "ireland" },
  { label: "Israel", value: "israel" },
  { label: "Italy", value: "italy" },
  { label: "Jamaica", value: "jamaica" },
  { label: "Japan", value: "japan" },
  { label: "Jordan", value: "jordan" },
  { label: "Kazakhstan", value: "kazakhstan" },
  { label: "Kenya", value: "kenya" },
  { label: "Kiribati", value: "kiribati" },
  { label: "Korea", value: "korea" },
  { label: "Kuwait", value: "kuwait" },
  { label: "Kyrgyzstan", value: "kyrgyzstan" },
  { label: "Lao People's Democratic Republic", value: "lao people's democratic republic" },
  { label: "Latvia", value: "latvia" },
  { label: "Lebanon", value: "lebanon" },
  { label: "Lesotho", value: "lesotho" },
  { label: "Liberia", value: "liberia" },
  { label: "Libyan Arab Jamahiriya", value: "libyan arab jamahiriya" },
  { label: "Liechtenstein", value: "liechtenstein" },
  { label: "Lithuania", value: "lithuania" },
  { label: "Luxembourg", value: "luxembourg" },
  { label: "Macao", value: "macao" },
  { label: "Macedonia", value: "macedonia" },
  { label: "Madagascar", value: "madagascar" },
  { label: "Malawi", value: "malawi" },
  { label: "Malaysia", value: "malaysia" },
  { label: "Maldives", value: "maldives" },
  { label: "Mali", value: "mali" },
  { label: "Malta", value: "malta" },
  { label: "Marshall Islands", value: "marshall islands" },
  { label: "Martinique", value: "martinique" },
  { label: "Mauritania", value: "mauritania" },
  { label: "Mauritius", value: "mauritius" },
  { label: "Mayotte", value: "mayotte" },
  { label: "Mexico", value: "mexico" },
  { label: "Micronesia", value: "micronesia" },
  { label: "Moldova", value: "moldova" },
  { label: "Monaco", value: "monaco" },
  { label: "Mongolia", value: "mongolia" },
  { label: "Montserrat", value: "montserrat" },
  { label: "Morocco", value: "morocco" },
  { label: "Mozambique", value: "mozambique" },
  { label: "Myanmar", value: "myanmar" },
  { label: "Namibia", value: "namibia" },
  { label: "Nauru", value: "nauru" },
  { label: "Nepal", value: "nepal" },
  { label: "Netherlands", value: "netherlands" },
  { label: "Netherlands Antilles", value: "netherlands antilles" },
  { label: "New Caledonia", value: "new caledonia" },
  { label: "New Zealand", value: "new zealand" },
  { label: "Nicaragua", value: "nicaragua" },
  { label: "Niger", value: "niger" },
  { label: "Nigeria", value: "nigeria" },
  { label: "Niue", value: "niue" },
  { label: "Norfolk Island", value: "norfolk island" },
  { label: "Northern Mariana Islands", value: "northern mariana islands" },
  { label: "Norway", value: "norway" },
  { label: "Oman", value: "oman" },
  { label: "Pakistan", value: "pakistan" },
  { label: "Palau", value: "palau" },
  { label: "Palestinian Territory", value: "palestinian territory" },
  { label: "Panama", value: "panama" },
  { label: "Papua New Guinea", value: "papua new guinea" },
  { label: "Paraguay", value: "paraguay" },
  { label: "Peru", value: "peru" },
  { label: "Philippines", value: "philippines" },
  { label: "Pitcairn", value: "pitcairn" },
  { label: "Poland", value: "poland" },
  { label: "Portugal", value: "portugal" },
  { label: "Puerto Rico", value: "puerto rico" },
  { label: "Qatar", value: "qatar" },
  { label: "Reunion", value: "reunion" },
  { label: "Romania", value: "romania" },
  { label: "Russian Federation", value: "russian federation" },
  { label: "Rwanda", value: "rwanda" },
  { label: "Saint Helena", value: "saint helena" },
  { label: "Saint Kitts and Nevis", value: "saint kitts and nevis" },
  { label: "Saint Lucia", value: "saint lucia" },
  { label: "Saint Pierre and Miquelon", value: "saint pierre and miquelon" },
  { label: "Saint Vincent and the Grenadines", value: "saint vincent and the grenadines" },
  { label: "Samoa", value: "samoa" },
  { label: "San Marino", value: "san marino" },
  { label: "Sao Tome and Principe", value: "sao tome and principe" },
  { label: "Saudi Arabia", value: "saudi arabia" },
  { label: "Senegal", value: "senegal" },
  { label: "Serbia and Montenegro", value: "serbia and montenegro" },
  { label: "Seychelles", value: "seychelles" },
  { label: "Sierra Leone", value: "sierra leone" },
  { label: "Singapore", value: "singapore" },
  { label: "Slovakia", value: "slovakia" },
  { label: "Slovenia", value: "slovenia" },
  { label: "Solomon Islands", value: "solomon islands" },
  { label: "Somalia", value: "somalia" },
  { label: "South Africa", value: "south africa" },
  { label: "South Georgia and the South Sandwich Islands", value: "south georgia and the south sandwich islands" },
  { label: "Spain", value: "spain" },
  { label: "Sri Lanka", value: "sri lanka" },
  { label: "Sudan", value: "sudan" },
  { label: "Suriname", value: "suriname" },
  { label: "Svalbard and Jan Mayen", value: "svalbard and jan mayen" },
  { label: "Swaziland", value: "swaziland" },
  { label: "Sweden", value: "sweden" },
  { label: "Switzerland", value: "switzerland" },
  { label: "Syrian Arab Republic", value: "syrian arab republic" },
  { label: "Taiwan", value: "taiwan" },
  { label: "Tajikistan", value: "tajikistan" },
  { label: "Tanzania", value: "tanzania" },
  { label: "Thailand", value: "thailand" },
  { label: "Timor-Leste", value: "timor-leste" },
  { label: "Togo", value: "togo" },
  { label: "Tokelau", value: "tokelau" },
  { label: "Tonga", value: "tonga" },
  { label: "Trinidad and Tobago", value: "trinidad and tobago" },
  { label: "Tunisia", value: "tunisia" },
  { label: "Turkey", value: "turkey" },
  { label: "Turkmenistan", value: "turkmenistan" },
  { label: "Turks and Caicos Islands", value: "turks and caicos islands" },
  { label: "Tuvalu", value: "tuvalu" },
  { label: "Uganda", value: "uganda" },
  { label: "Ukraine", value: "ukraine" },
  { label: "United Arab Emirates", value: "united arab emirates" },
  { label: "United Kingdom", value: "united kingdom" },
  { label: "United States", value: "united states" },
  { label: "United States Minor Outlying Islands", value: "united states minor outlying islands" },
  { label: "Uruguay", value: "uruguay" },
  { label: "Uzbekistan", value: "uzbekistan" },
  { label: "Vanuatu", value: "vanuatu" },
  { label: "Venezuela", value: "venezuela" },
  { label: "Viet Nam", value: "viet nam" },
  { label: "Virgin Islands, British", value: "virgin islands, british" },
  { label: "Virgin Islands, U.s.", value: "virgin islands, u.s." },
  { label: "Wallis and Futuna", value: "wallis and futuna" },
  { label: "Western Sahara", value: "western sahara" },
  { label: "Yemen", value: "yemen" },
  { label: "Zambia", value: "zambia" },
  { label: "Zimbabwe", value: "zimbabwe" },
]

interface SelectCountryProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function SelectCountry({ value, onValueChange, disabled = false }: SelectCountryProps) {
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between"
        >
          {value
            ? countries.find((country) => country.label === value)?.label
            : t('Select country...')}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={t('Search country...')} />
          <CommandList>
            <CommandEmpty>{t('No country found.')}</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.label}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
