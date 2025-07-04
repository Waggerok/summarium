import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { useState, useRef } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Button } from './UI/button';
import { componentsStyles } from '@/styles';
import { useTheme } from '@/hooks';
import * as DocumentPicker from 'expo-document-picker';
import Api from '@/Api';
import { TaskType, SummarizationTemplateType } from '@/Api/generated/api';

const uploadComponent = () => {
    const theme = useTheme();
    const [file, setFile] = useState<any>(null);
    const [projectId, setProjectId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [summaryText, setSummaryText] = useState<string>('');
    const [status, setStatus] = useState<'idle' | 'transcribing' | 'summarizing' | 'done' | 'error'>('idle');
    const [progress, setProgress] = useState<number>(0);
    const startTimeRef = useRef<number | null>(null);

    // Фейковый прогресс (как в web)
    const getFakeProgress = (phase: 'transcribing' | 'summarizing', start: number | null) => {
        if (!start) return 0;
        const now = Date.now();
        const elapsed = now - start;
        // Фейковые значения: транскрибация 10 сек, суммаризация 7 сек
        const total = phase === 'transcribing' ? 10000 : 7000;
        return Math.min(100, Math.floor((elapsed / total) * 100));
    };

    // Основной процесс: транскрибация -> суммаризация -> показать summary
    const handleSummarize = async () => {
        if (!file) return;
        setError(null);
        setSummaryText('');
        setStatus('transcribing');
        setProgress(0);
        startTimeRef.current = Date.now();
        try {
            // 1. Загрузка файла
            const uploadRes = await Api.UploadsApi.uploadFileApiUploadsUploadFilePost(file);
            const project_id = uploadRes.data.project_id;
            setProjectId(project_id);
            // 2. Создание задачи транскрибации
            await Api.ProjectsApi.createTaskApiProjectCreateTaskPost({
                project_id,
                task_type: TaskType.Transcribation,
                params: {},
            });
            // 3. Polling транскрибации
            await pollForTranscription(project_id);
            setStatus('summarizing');
            setProgress(0);
            startTimeRef.current = Date.now();
            // 4. Создание задачи суммаризации
            await Api.ProjectsApi.createTaskApiProjectCreateTaskPost({
                project_id,
                task_type: TaskType.Summarization,
                params: { template: SummarizationTemplateType.Report },
            });
            // 5. Polling суммаризации
            await pollForSummarization(project_id);
            setStatus('done');
            setProgress(100);
        } catch (e: any) {
            setError('Ошибка процесса транскрибации или суммаризации');
            setStatus('error');
            if (e && e.response && e.response.data) {
                console.log('Ошибка процесса:', e.response.data);
            } else {
                console.log('Ошибка процесса:', e);
            }
        }
    };

    // Polling транскрибации
    const pollForTranscription = async (project_id: string) => {
        return new Promise<void>((resolve, reject) => {
            const interval = setInterval(async () => {
                try {
                    setProgress(getFakeProgress('transcribing', startTimeRef.current));
                    const res = await Api.ProjectsApi.getUserProjectApiProjectProjectIdGet(project_id);
                    const project = res.data;
                    if (project.status === 'OK' && project.transcription_result) {
                        clearInterval(interval);
                        setProgress(100);
                        resolve();
                    } else if (project.status === 'ERROR') {
                        clearInterval(interval);
                        reject(new Error('Ошибка транскрибации'));
                    }
                } catch (e) {
                    clearInterval(interval);
                    reject(e);
                }
            }, 700);
        });
    };

    // Polling суммаризации
    const pollForSummarization = async (project_id: string) => {
        return new Promise<void>((resolve, reject) => {
            const interval = setInterval(async () => {
                try {
                    setProgress(getFakeProgress('summarizing', startTimeRef.current));
                    const res = await Api.ProjectsApi.getUserProjectApiProjectProjectIdGet(project_id);
                    const project = res.data;
                    if (project.status === 'OK' && project.resume_result) {
                        clearInterval(interval);
                        setSummaryText(project.resume_result);
                        setProgress(100);
                        resolve();
                    } else if (project.status === 'ERROR') {
                        clearInterval(interval);
                        reject(new Error('Ошибка суммаризации'));
                    }
                } catch (e) {
                    clearInterval(interval);
                    reject(e);
                }
            }, 700);
        });
    };

    // Функция для удаления HTML-тегов
    const stripHtml = (html: string) => {
        return html.replace(/<[^>]+>/g, '');
    };

    return (
        <View className={`border shadow-sm h-[30%] w-full rounded-lg p-4`} style={{backgroundColor: theme.bg, borderColor: theme.stroke}}>
            <View className='border-2 border-dashed w-full h-full rounded-lg flex flex-col justify-center items-center space-y-4' style={{borderColor: theme.stroke}}>
                <Feather name='upload' size={50} style={{color: theme.stroke}}/>
                <Text style={{color: theme.secondaryText}}>Выберите файл чтобы загрузить</Text>
                {file && <Text style={{color: theme.mainText}}>{file.name}</Text>}
                {(status === 'transcribing' || status === 'summarizing') && (
                    <View style={{alignItems: 'center'}}>
                        <ActivityIndicator size='small' color={theme.stroke}/>
                        <Text style={{color: theme.secondaryText}}>
                            {status === 'transcribing' ? 'Транскрибация...' : 'Суммаризация...'}
                        </Text>
                        <Text style={{color: theme.secondaryText}}>Прогресс: {progress}%</Text>
                    </View>
                )}
                {error && <Text style={{color: 'red'}}>{error}</Text>}
                <Button
                    text='Выбрать файл'
                    onPress={async () => {
                        setError(null);
                        try {
                            const result = await DocumentPicker.getDocumentAsync({
                                type: [
                                    'audio/mpeg',
                                    'audio/wav',
                                    'audio/mp3',
                                    'audio/x-m4a',
                                    'audio/aac',
                                    'audio/flac',
                                    'audio/ogg',
                                    'audio/webm',
                                ],
                            });
                            if (!result.canceled && result.assets && result.assets.length > 0) {
                                setFile(result.assets[0]);
                                console.log('Файл выбран:', result.assets[0]);
                            }
                        } catch (error) {
                            setError('Ошибка выбора файла');
                            console.log('Ошибка выбора файла:', error);
                        }
                    }}
                    style={[componentsStyles.button, {backgroundColor: theme.bg ,borderColor: theme.stroke}]}
                    className='border shadow-sm'
                    textStyle={{color: theme.mainText}}
                />                
                <Button
                    text='Суммаризировать'
                    onPress={handleSummarize}
                    disabled={!file || status === 'transcribing' || status === 'summarizing'}
                    style={[componentsStyles.button, {backgroundColor: theme.bg ,borderColor: theme.stroke}]}
                    className='border shadow-sm'
                    textStyle={{color: theme.mainText}}
                />
            </View>
            {/* Выводим только суммаризацию после завершения */}
            {status === 'done' && summaryText ? (
                <View style={{marginTop: 24, padding: 16, backgroundColor: theme.bg, borderRadius: 8, borderWidth: 1, borderColor: theme.stroke, maxHeight: 250}}>
                    <Text style={{fontWeight: 'bold', color: theme.mainText, marginBottom: 8}}>Суммаризация:</Text>
                    <ScrollView style={{maxHeight: 200}}>
                        <Text style={{color: theme.secondaryText, fontSize: 13, lineHeight: 18}} selectable>{stripHtml(summaryText)}</Text>
                    </ScrollView>
                </View>
            ) : null}
        </View>
    );
};

export default uploadComponent;