import React, { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const [item, setItem] = React.useState(currentLanguage);

    const languages = [
        { code: 'cs', img: '/images/icons/cs.svg', lang: 'Česky' },
        { code: 'vn', img: '/images/icons/vn.png', lang: 'VietNam' },
        { code: 'en', img: '/images/icons/en.png', lang: 'English' },
        { code: 'ja', img: '/images/icons/ja.png', lang: 'Japan' },
        { code: 'fr', img: '/images/icons/fr.png', lang: 'French' },
        { code: 'es', img: '/images/icons/es.png', lang: 'Spanish' },

    ];

    const handleChange = (event) => {
        const selectedLang = event.target.value;
        setItem(selectedLang);
        i18n.changeLanguage(selectedLang);
    };
    useEffect(() => {
        document.body.dir = i18n.dir()
    }, [i18n, i18n.language])

    return (
        <div>

            <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: 'white' }}>
                <Select
                    value={item}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    renderValue={(selected) => {
                        if (!selected) {
                            return <em>Language</em>;
                        }
                        const selectedLang = languages.find(lang => lang.code === selected);
                        return (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={selectedLang.img} style={{ width: 24, height: 24, marginRight: 8 }} />
                                {selectedLang.lang}
                            </div>
                        );
                    }}
                >
                    {languages.map((lang) => (
                        <MenuItem key={lang.code} value={lang.code}>
                            {lang.lang}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
