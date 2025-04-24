import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  formAuth: {
    flexDirection: 'column',
    gap: 20,
    width: '100%',
    borderRadius: 10,
    padding: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    height: 48
  },
}); 

export default commonStyles;