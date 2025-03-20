import { FC, useEffect } from 'react';

import { ISection } from '../../../../../../models';

import { useAppSelector } from '../../../../../../hooks';
import { useDispatch } from 'react-redux';
import {
  selectMenu,
  setActiveCategory,
  setActiveSection
} from '../../../../../../redux';
import { Chip, Stack } from '@mui/material';

interface Props {
  sections: ISection[];
  /*
   cambiarSeccion: (value: number) => void;
   seccion: number; */
}

export const Sections: FC<Props> = ({ sections }) => {
  const { activeSection } = useAppSelector(selectMenu);

  const dispatch = useDispatch();

  const changeSection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    dispatch(setActiveSection(section!));

    dispatch(setActiveCategory(section!.categories[0]));
  };

  useEffect(() => {
    sections.length > 0 && dispatch(setActiveSection(sections[0]));
  }, []);

  return (
    <>
      <Stack
        direction='row'
        sx={{
          width: 'auto',
          overflowX: 'auto'
        }}
        spacing={1}
        py={1}
      >
        {sections.map((section) => {
          if (section.categories.length > 0 && section.isActive)
            return (
              <Chip
                label={section.name}
                key={section.id}
                onClick={() => changeSection(section.id)}
                clickable
                color={activeSection?.id === section.id ? 'info' : 'default'}
              />
            );
        })}
      </Stack>
    </>
  );
};
