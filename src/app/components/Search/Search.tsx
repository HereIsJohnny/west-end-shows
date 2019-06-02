import AppBar from '@material-ui/core/AppBar'
import InputBase from '@material-ui/core/InputBase'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import { styles } from './styles'

interface SearchProps {
  onChange: (event: string | null) => void
  query: string | null
}

export const Search: React.FunctionComponent<SearchProps> = ({ onChange, query }) => {
  const classes = styles()
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value)

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            West End Shows
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={query || ''}
              onChange={onSearchChange}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
